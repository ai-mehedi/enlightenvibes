import { cookies } from "next/headers";

export type AdminSession = {
  id: number;
  email: string;
  name: string | null;
  role: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return null;
  }

  try {
    return JSON.parse(session.value) as AdminSession;
  } catch {
    return null;
  }
}
