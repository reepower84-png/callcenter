import { NextRequest, NextResponse } from 'next/server'
import { backupFetch } from "../../../lib/inquiry-backup";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Send Discord notification directly
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json(
        { error: '알림 설정이 되어있지 않습니다.' },
        { status: 500 }
      )
    }

    const discordResponse = await backupFetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: '🔔 새로운 상담 문의가 접수되었습니다',
            color: 0x3b82f6,
            fields: [
              {
                name: '이름',
                value: name,
                inline: true,
              },
              {
                name: '전화번호',
                value: phone,
                inline: true,
              },
              {
                name: '상담문의',
                value: message,
                inline: false,
              },
            ],
            footer: {
              text: '콜통합센터',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    if (!discordResponse.ok) {
      return NextResponse.json(
        { error: '알림 전송에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
