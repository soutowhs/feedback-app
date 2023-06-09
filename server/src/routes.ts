/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailter-mail-adapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repositories'
import { SubmitFeedbackService } from './services/submit-feedback-service'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  try {
    const feedback = await submitFeedbackService.execute({
      type,
      comment,
      screenshot
    })

    return res.status(201).send({ feedback })
  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
})
