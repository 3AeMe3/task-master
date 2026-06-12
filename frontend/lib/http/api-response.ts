export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export async function readApiResponse<T>(
  response: Response,
  fallbackMessage: string,
): Promise<ApiSuccessResponse<T>> {
  const payload = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse
    | null;

  if (!response.ok || !payload || payload.success !== true) {
    const message =
      payload && payload.success === false
        ? payload.error.message
        : fallbackMessage;

    throw new Error(message);
  }

  return payload;
}
