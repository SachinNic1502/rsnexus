/**
 * Minimal typed fetch client for the RSNexus backend API.
 *
 * Every backend route answers with the same envelope, so unwrapping and error
 * normalisation live here instead of being repeated in each caller.
 * The base URL always comes from the environment; it is never hardcoded.
 */

export interface ApiResponseMeta {
  /** Present on failures. */
  code?: string
  requestId?: string
  timestamp?: string
  path?: string
  /** Present on paginated list responses. */
  page?: number
  limit?: number
  totalItems?: number
  totalPages?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  nextPage?: number | null
  previousPage?: number | null
}

export interface ApiFieldError {
  field: string
  message: string
}

export interface ApiEnvelope<TData> {
  success: boolean
  message: string
  data: TData | null
  meta?: ApiResponseMeta | null
  errors?: ApiFieldError[] | null
}

export interface ApiResult<TData> {
  data: TData
  meta: ApiResponseMeta | null
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly requestId?: string
  readonly fieldErrors: ApiFieldError[]

  constructor(
    message: string,
    options: { status?: number; code?: string; requestId?: string; fieldErrors?: ApiFieldError[] } = {},
  ) {
    super(message)
    this.name = "ApiError"
    this.status = options.status ?? 0
    this.code = options.code ?? "UNKNOWN_ERROR"
    this.requestId = options.requestId
    this.fieldErrors = options.fieldErrors ?? []
  }
}

export type ApiQuery = Record<string, string | number | boolean | undefined | null>

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  query?: ApiQuery
  body?: unknown
  /** Next.js data-cache options, forwarded as-is on the server. */
  next?: { revalidate?: number | false; tags?: string[] }
}

/**
 * Reads the API base URL from the environment. Throws instead of falling back to
 * a hardcoded host so a misconfigured deployment fails loudly.
 */
export function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!baseUrl) {
    throw new ApiError("API base URL is not configured. Set NEXT_PUBLIC_API_BASE_URL.", {
      code: "API_BASE_URL_MISSING",
    })
  }

  return baseUrl.replace(/\/+$/, "")
}

export function buildApiUrl(path: string, query?: ApiQuery): string {
  const url = new URL(`${getApiBaseUrl()}/${path.replace(/^\/+/, "")}`)

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

function isEnvelope(payload: unknown): payload is ApiEnvelope<unknown> {
  return typeof payload === "object" && payload !== null && "success" in payload
}

/**
 * Performs a request against the backend and returns the unwrapped `data`.
 * Any non-2xx response, transport failure or `success: false` body is surfaced
 * as an {@link ApiError} so callers only have to handle one error shape.
 */
export async function apiRequest<TData>(path: string, options: ApiRequestOptions = {}): Promise<ApiResult<TData>> {
  const { query, body, headers, ...init } = options

  let response: Response

  try {
    response = await fetch(buildApiUrl(path, query), {
      ...init,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    throw new ApiError(error instanceof Error ? error.message : "Network request failed.", {
      code: "NETWORK_ERROR",
    })
  }

  let payload: unknown = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  const envelope = isEnvelope(payload) ? payload : null

  if (!response.ok || !envelope?.success) {
    throw new ApiError(envelope?.message ?? `Request failed with status ${response.status}.`, {
      status: response.status,
      code: envelope?.meta?.code,
      requestId: envelope?.meta?.requestId,
      fieldErrors: envelope?.errors ?? [],
    })
  }

  return { data: (envelope.data ?? null) as TData, meta: envelope.meta ?? null }
}
