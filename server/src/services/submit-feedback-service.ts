import { type Feedback } from '@prisma/client'
import { type MailAdapter } from '../adapters/mail-adapter'
import { type FeedbackRepository } from '../repositories/feedbacks-repository'

export interface SubmitFeedbackServiceRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackService {
  constructor (
    private readonly feedbacksRepository: FeedbackRepository,
    private readonly mailAdapter: MailAdapter
  ) { }

  async execute (req: SubmitFeedbackServiceRequest): Promise<Feedback> {
    const { type, comment, screenshot } = req

    if (type == null || type === '') {
      throw new Error('Type is required.')
    }

    if (comment == null || comment === '') {
      throw new Error('Comment is required.')
    }

    if (screenshot != null && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>'
      ].join('\n')
    })

    return feedback
  }
}
