

	// //controller for enhancing a resumes's professional summary
	// // POST: /api/ai/enhance-pro-sum

	// import Resume from "../models/resume.js";
	// import ai from "../configs/ai.js";

	// export const enhanceProfessionalSummary = async (req, res) => {
	// 	try {

	// 		const { userContent } = req.body;
	// 		if (!userContent) {
	// 			return res.status(400).json({ message: 'Missing required fields' })
	// 		}

	// 		const response = await ai.chat.completions.create({
	// 			model: process.env.OPENAI_MODEL,
	// 			messages: [
	// 				{
	// 					role: "system",
	// 					content: "you are an expert in resume writing. your task is to enhance the professional summary of a resume.The summary should should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-fiendly.only return text no options or anything else"
	// 				},
	// 				{
	// 					role: "user",
	// 					content: userContent,
	// 				},
	// 			],
	// 		})

	// 		const enhanceContent = response.choices[0].message.content;
	// 		return res.status(200).json({ enhanceContent })

	// 	} catch (error) {
	// 		return res.status(400).json({ message: error.message })
	// 	}
	// }


	// //controller for enhancing a resumes's job description
	// // POST: /api/ai/enhance-job-desc

	// export const enhanceJobDescription = async (req, res) => {
	// 	try {

	// 		const { userContent } = req.body;
	// 		if (!userContent) {
	// 			return res.status(400).json({ message: 'Missing required fields' })
	// 		}

	// 		const response = await ai.chat.completions.create({
	// 			model: process.env.OPENAI_MODEL,
	// 			messages: [
	// 				{
	// 					role: "system",
	// 					content: "you are an expert in resume writing. your task is to enhance the job description of a resume. The job description should be only 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no option or anything else"
	// 				},
	// 				{
	// 					role: "user",
	// 					content: userContent,
	// 				},
	// 			],
	// 		})

	// 		const enhanceContent = response.choices[0].message.content;
	// 		return res.status(200).json({ enhanceContent })

	// 	} catch (error) {
	// 		return res.status(400).json({ message: error.message })
	// 	}
	// }



	// //controller for uploading a resume to the database
	// // POST: /api/ai/upload-resume


	// export const uploadResume = async (req, res) => {
	// 	try {

	// 		const { resumeText, title } = req.body;
	// 		const userId = req.userId

	// 		if (!resumeText) {
	// 			return res.status(400).json({ message: 'Missing required fields' })
	// 		}


	// 		const systemPrompt = "you are expert AI Agent to extract data from resume."

	// 		const userPrompt = `Extract structured data from this resume text and return ONLY valid JSON.

	// Resume text:
	// ${resumeText}

	// Return this exact JSON structure with extracted values (empty string if not found):
	// {
	// "personal_info": {
	// 	"full_name": "",
	// 	"profession": "",
	// 	"email": "",
	// 	"phone": "",
	// 	"location": "",
	// 	"linkedin": "",
	// 	"website": ""
	// },
	// "professional_summary": "",
	// "experience": [
	// 	{ "company": "", "position": "", "start_date": "", "end_date": "", "description": "", "is_current": false }
	// ],
	// "projects": [
	// 	{ "name": "", "type": "", "description": "" }
	// ],
	// "education": [
	// 	{ "institution": "", "degree": "", "field": "", "graduation_date": "", "gpa": "" }
	// ],
	// "skills": []
	// }`

	// 		const response = await ai.chat.completions.create({
	// 			model: process.env.OPENAI_MODEL,
	// 			messages: [
	// 				{
	// 					role: "system",
	// 					content: systemPrompt
	// 				},
	// 				{
	// 					role: "user",
	// 					content: userPrompt,
	// 				},
	// 			],
	// 		})

	// 		const raw = response.choices[0].message.content
	// 		const clean = raw.replace(/```json|```/g, '').trim()
	// 		const parsedData = JSON.parse(clean)
	// 		const newResume = await Resume.create({ userId, title, ...parsedData })

	// 		return res.json({ resumeId: newResume._id })

	// 	} catch (error) {
	// 		return res.status(400).json({ message: error.message })
	// 	}
	// }


import Resume from "../models/resume.js";
import ai from "../configs/ai.js";

// ── Retry helper — retries on 503/429 with increasing delay ──
const callWithRetry = async (fn, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      const status = error?.status || error?.response?.status
      if ((status === 503 || status === 429) && i < retries - 1) {
        await new Promise(res => setTimeout(res, delay * (i + 1)))
        continue
      }
      throw error
    }
  }
}

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const response = await callWithRetry(() => ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "you are an expert in resume writing. your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. only return text no options or anything else"
        },
        { role: "user", content: userContent },
      ],
    }))

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent })

  } catch (error) {
    const status = error?.status || error?.response?.status
    if (status === 503) {
      return res.status(503).json({ message: 'AI service is busy, please try again in a few seconds' })
    }
    return res.status(400).json({ message: error.message })
  }
}

// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const response = await callWithRetry(() => ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "you are an expert in resume writing. your task is to enhance the job description of a resume. The job description should be only 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. only return text no options or anything else"
        },
        { role: "user", content: userContent },
      ],
    }))

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent })

  } catch (error) {
    const status = error?.status || error?.response?.status
    if (status === 503) {
      return res.status(503).json({ message: 'AI service is busy, please try again in a few seconds' })
    }
    return res.status(400).json({ message: error.message })
  }
}

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId

    if (!resumeText) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const systemPrompt = "You are an expert AI agent that extracts structured data from resume text. Always return valid JSON only, no markdown, no explanation."

    const userPrompt = `Extract structured data from this resume text and return ONLY valid JSON with no markdown code fences.

Resume text:
${resumeText}

Return exactly this JSON structure with extracted values (use empty string if not found, empty array if no items):
{
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "professional_summary": "",
  "experience": [
    { "company": "", "position": "", "start_date": "", "end_date": "", "description": "", "is_current": false }
  ],
  "projects": [
    { "name": "", "type": "", "description": "" }
  ],
  "education": [
    { "institution": "", "degree": "", "field": "", "graduation_date": "", "gpa": "" }
  ],
  "skills": []
}`

    const response = await callWithRetry(() => ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }))

    const raw = response.choices[0].message.content
    const clean = raw.replace(/```json|```/g, '').trim()

    let parsedData;
    try {
      parsedData = JSON.parse(clean)
    } catch (parseError) {
      return res.status(400).json({ message: 'AI returned invalid data, please try again' })
    }

    const newResume = await Resume.create({ userId, title, ...parsedData })
    return res.json({ resumeId: newResume._id })

  } catch (error) {
    const status = error?.status || error?.response?.status
    if (status === 503) {
      return res.status(503).json({ message: 'AI service is busy, please try again in a few seconds' })
    }
    return res.status(400).json({ message: error.message })
  }
}