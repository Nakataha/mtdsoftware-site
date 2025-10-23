#!/usr/bin/env node
import { z } from "zod";

const vercelEnv = (process.env.VERCEL_ENV ?? "").toLowerCase();
const nodeEnv = (process.env.NODE_ENV ?? "").toLowerCase();
const isCi = process.env.CI === "true";
const isProdOrPreview = vercelEnv === "production" || vercelEnv === "preview" || (!vercelEnv && nodeEnv === "production" && isCi);

const allowIncompleteEnv = process.env.ALLOW_INCOMPLETE_ENV === "1" && !isProdOrPreview;

if (allowIncompleteEnv) {
  console.warn(
    "⚠️  Environment validation skipped because ALLOW_INCOMPLETE_ENV=1. Required keys are not enforced in this mode."
  );
  process.exit(0);
}

const requiredString = (name) =>
  z
    .string({ required_error: `${name} is required`, invalid_type_error: `${name} is required` })
    .min(1, `${name} cannot be empty`);

const schema = z.object({
  TURNSTILE_SECRET: requiredString("TURNSTILE_SECRET"),
  TURNSTILE_SITE_KEY: requiredString("TURNSTILE_SITE_KEY"),
  SMTP_HOST: requiredString("SMTP_HOST"),
  SMTP_PORT: z
    .coerce
    .number({
      required_error: "SMTP_PORT is required",
      invalid_type_error: "SMTP_PORT must be a valid number",
    })
    .int("SMTP_PORT must be an integer")
    .positive("SMTP_PORT must be greater than 0"),
  SMTP_USER: requiredString("SMTP_USER"),
  SMTP_PASS: requiredString("SMTP_PASS"),
  SMTP_FROM: requiredString("SMTP_FROM"),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  console.error("\n❌ Environment validation failed:\n");
  for (const issue of result.error.issues) {
    const path = issue.path.join(".") || "<root>";
    const key = typeof issue.path[0] === "string" ? issue.path[0] : undefined;
    const rawValue = key ? process.env[key] : undefined;
    let message = issue.message;

    if (issue.code === "invalid_type") {
      if (rawValue === undefined) {
        message = `${path} is required`;
      } else if (key === "SMTP_PORT") {
        message = "SMTP_PORT must be a valid number";
      }
    }

    console.error(`- ${path}: ${message}`);
  }
  console.error("\nSet the required environment variables or run with ALLOW_INCOMPLETE_ENV=1 during local development.\n");
  process.exit(1);
}

console.log("✅ Environment validation passed.");
