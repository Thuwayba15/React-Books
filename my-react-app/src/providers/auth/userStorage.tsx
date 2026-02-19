export interface IStoredUser {
  email: string;
  passwordHash: string; 
}

const USERS_KEY = "bookapp.users";

export const hashPassword = (password: string) => {
  let hash = 0;
  for (let i = 0; i < password.length; i += 1) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0; 
  }
  return String(hash);
};

export const userStorage = {
  loadUsers(): IStoredUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as IStoredUser[];
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  },

  saveUsers(users: IStoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  seedDefaultUsers() {
    // Seed only if empty
    const existing = this.loadUsers();
    if (existing.length > 0) return;

    const demo: IStoredUser[] = [
      { email: "demo@user.com", passwordHash: hashPassword("demo123") },
      { email: "admin@book.com", passwordHash: hashPassword("admin123") },
    ];

    this.saveUsers(demo);
  },
};