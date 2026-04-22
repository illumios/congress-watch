"use client";

import { useState } from "react";

import type { Member } from "@/lib/congress-data";

function getMemberInitials(member: Member) {
  if (!member.fullName.trim()) {
    return member.stateCode;
  }

  return `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`.trim() || member.stateCode;
}

export function MemberAvatar({
  member,
  className,
  imageClassName,
  initialsClassName,
}: {
  member: Member;
  className: string;
  imageClassName?: string;
  initialsClassName?: string;
}) {
  const [failedPortraitUrl, setFailedPortraitUrl] = useState<string | null>(null);
  const showImage = Boolean(member.portraitUrl && failedPortraitUrl !== member.portraitUrl && member.fullName.trim());

  return (
    <div
      className={`${className} overflow-hidden bg-[linear-gradient(180deg,rgba(248,250,253,1),rgba(232,238,247,1))]`}
      aria-hidden={showImage ? undefined : true}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.portraitUrl ?? undefined}
          alt={`Portrait of ${member.fullName}`}
          className={imageClassName ?? "h-full w-full object-cover"}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailedPortraitUrl(member.portraitUrl)}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center text-[var(--navy)] ${initialsClassName ?? "text-base font-semibold"}`}
        >
          {getMemberInitials(member)}
        </div>
      )}
    </div>
  );
}
