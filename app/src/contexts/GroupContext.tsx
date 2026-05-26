"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { setClientGroup, type UserGroup } from "@/lib/groups";

type GroupContextType = {
  group: UserGroup;
  changeGroup: (g: UserGroup) => void;
};

const GroupContext = createContext<GroupContextType>({
  group: "high-school",
  changeGroup: () => {},
});

export function GroupProvider({
  children,
  initialGroup = "high-school",
}: {
  children: ReactNode;
  initialGroup?: string;
}) {
  const VALID: UserGroup[] = ["elementary", "junior-hs", "high-school", "university", "career", "curious"];
  const validGroup = (VALID.includes(initialGroup as UserGroup) ? initialGroup : "high-school") as UserGroup;
  const [group, setGroupState] = useState<UserGroup>(validGroup);

  function changeGroup(g: UserGroup) {
    setClientGroup(g);
    setGroupState(g);
    fetch("/api/user-group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: g }),
    }).catch(() => {});
  }

  return (
    <GroupContext.Provider value={{ group, changeGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroup() {
  return useContext(GroupContext);
}
