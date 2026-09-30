import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { JobApplication, JobOpening } from "@/models";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobId,
      candidateName,
      email,
      phone,
      portfolioUrl,
      linkedinUrl,
      resumeUrl,
      coverLetter,
    } = body;

    if (!jobId || !candidateName || !email || !phone || !resumeUrl) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Phone, Resume)." },
        { status: 400 }
      );
    }

    await connectDB();

    let jobTitle = "General Application";
    let validJobId: any = jobId;

    if (mongoose.Types.ObjectId.isValid(jobId)) {
      try {
        const job = await JobOpening.findById(jobId);
        if (job) {
          jobTitle = job.title;
        }
      } catch (err) {
        console.warn("Could not find JobOpening by ID:", err);
      }
    } else {
      validJobId = new mongoose.Types.ObjectId();
    }

    let application: any = null;
    try {
      application = await JobApplication.create({
        jobId: validJobId,
        candidateName,
        email,
        phone,
        portfolioUrl: portfolioUrl || "",
        linkedinUrl: linkedinUrl || "",
        resumeUrl,
        coverLetter: coverLetter || "",
        status: "submitted",
      });
    } catch (dbErr) {
      console.warn("Could not persist JobApplication to MongoDB:", dbErr);
    }

    // Optional email notification to studio founders
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${candidateName}" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER || siteConfig.contact.email,
          subject: `💼 New Job Application: ${jobTitle} - ${candidateName}`,
          html: `
            <h2>New Candidate Application</h2>
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Candidate:</strong> ${candidateName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Resume Link:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
            ${portfolioUrl ? `<p><strong>Portfolio / GitHub:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>` : ""}
            ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ""}
            ${coverLetter ? `<p><strong>Cover Letter:</strong><br/>${coverLetter}</p>` : ""}
          `,
        });
      } catch (mailErr) {
        console.warn("Could not dispatch application notification email:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your application has been received! Our engineering leadership will review your profile shortly.",
      applicationId: application?._id || "submitted",
    });
  } catch (error: any) {
    console.error("Job application submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit application." },
      { status: 500 }
    );
  }
}
