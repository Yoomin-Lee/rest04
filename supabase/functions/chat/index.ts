import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `당신은 PawEdu의 반려동물 교육 전문 AI 어시스턴트입니다.
김예진 동물병원이 운영하는 반려동물 헬스케어 온라인 교육 플랫폼입니다.
반려동물의 건강관리, 행동 교육, AI 기술 적용, 수의학 지식에 대한 질문에 친절하고 전문적으로 답변해주세요.
수의학적 진단이나 처방은 할 수 없으며, 필요 시 전문 수의사 상담을 권장해주세요.
간결하고 이해하기 쉽게 한국어로 답변해주세요.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { messages, model } = await req.json()
    const solarKey = Deno.env.get('SOLAR_API_KEY')
    const openaiKey = Deno.env.get('OPENAI_API_KEY')

    const fullMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]

    // Solar 선택 또는 기본값
    if (model !== 'openai' && solarKey) {
      const res = await fetch('https://api.upstage.ai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${solarKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'solar-pro', messages: fullMessages, max_tokens: 1000, temperature: 0.7 }),
      })
      if (res.ok) {
        const data = await res.json()
        return new Response(
          JSON.stringify({ content: data.choices[0].message.content, model: 'solar' }),
          { headers: { ...CORS, 'Content-Type': 'application/json' } }
        )
      }
    }

    // OpenAI 선택 또는 Solar fallback
    if (!openaiKey) throw new Error('API 키 없음')
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: fullMessages, max_tokens: 1000, temperature: 0.7 }),
    })
    if (!res.ok) throw new Error('OpenAI 오류')
    const data = await res.json()
    return new Response(
      JSON.stringify({ content: data.choices[0].message.content, model: 'openai' }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  }
})
