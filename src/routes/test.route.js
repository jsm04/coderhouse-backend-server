import { Router } from "express"
import { testHandler } from '../controllers/test.controller.js'

const router = Router()
router.get('/', testHandler)
export default router
