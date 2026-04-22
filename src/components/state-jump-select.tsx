"use client";

import { useRouter } from "next/navigation";

export function StateJumpSelect({
  states,
}: {
  states: Array<{ code: string; name: string; slug: string }>;
}) {
  const router = useRouter();

  return (
    <label className="block">
      <span className="sr-only">Select a state</span>
      <select
        defaultValue=""
        onChange={(event) => {
          const selectedState = event.currentTarget.value;
          if (!selectedState) return;
          router.push(`/states/${selectedState}`);
        }}
        className="w-full rounded-[0.85rem] border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] outline-none"
      >
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state.code} value={state.slug}>
            {state.name}
          </option>
        ))}
      </select>
    </label>
  );
}
