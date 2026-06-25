

//controller for enhancing a resumes's professional summary
// POST: /api/ai/enhance-pro-sum

import Resume from "../models/resume.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
	try {

		const { userContent } = req.body;
		if (!userContent) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const response = await ai.chat.completions.create({
			model: process.env.OPENAI_MODEL,
			messages: [
				{
					role: "system",
					content: "you are an expert in resume writing. your task is to enhance the professional summary of a resume.The summary should should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-fiendly.only return text no options or anything else"
				},
				{
					role: "user",
					content: userContent,
				},
			],
		})

		const enhanceContent = response.choices[0].message.content;
		return res.status(200).json({ enhanceContent })

	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}


//controller for enhancing a resumes's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
	try {

		const { userContent } = req.body;
		if (!userContent) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const response = await ai.chat.completions.create({
			model: process.env.OPENAI_MODEL,
			messages: [
				{
					role: "system",
					content: "you are an expert in resume writing. your task is to enhance the job description of a resume. The job description should be only 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no option or anything else"
				},
				{
					role: "user",
					content: userContent,
				},
			],
		})

		const enhanceContent = response.choices[0].message.content;
		return res.status(200).json({ enhanceContent })

	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}



//controller for uploading a resume to the database
// POST: /api/ai/upload-resume


export const uploadResume = async (req, res) => {
	try {

		const { resumeText, title } = req.body;
		const userId = req.userId

		if (!resumeText) {
			return res.status(400).json({ message: 'Missing required fields' })
		}


		const systemPrompt = "you are expert AI Agent to extract data from resume."

		const userPrompt = `Extract structured data from this resume text and return ONLY valid JSON.

Resume text:
${resumeText}

Return this exact JSON structure with extracted values (empty string if not found):
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

		const response = await ai.chat.completions.create({
			model: process.env.OPENAI_MODEL,
			messages: [
				{
					role: "system",
					content: systemPrompt
				},
				{
					role: "user",
					content: userPrompt,
				},
			],
			response_format: { type: 'json_object' }
		})

		const enhanceData = response.choices[0].message.content;

		const parsedData = JSON.parse(enhanceData)
		const newResume = await Resume.create({ userId, title, ...parsedData })

		return res.json({ resumeId: newResume._id })

	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}


