import { type Feedback } from '@prisma/client'
import { prisma } from '../../prisma'
import { type FeedbackCreateData, type FeedbackRepository } from '../feedbacks-repository'

export class PrismaFeedbacksRepository implements FeedbackRepository {
  async create ({ type, comment, screenshot }: FeedbackCreateData): Promise<Feedback> {
    return await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}
