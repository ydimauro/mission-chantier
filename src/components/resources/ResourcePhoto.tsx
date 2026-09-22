import Image from "next/image";
import { getResourcePhoto } from "@content/pages/resource-media";

/** Photographie libre de droit, embarquée localement et distincte de Givors. */
export function ResourcePhoto({ resourceId, term }: { resourceId: string; term: string }) {
  const photo = getResourcePhoto(resourceId);

  return (
    <figure>
      <Image src={photo.file} alt={`Photographie d’illustration : ${term}`} width={640} height={360} className="aspect-video h-auto w-full rounded-md border border-border bg-surface-muted object-contain" />
      <figcaption className="mt-2 text-xs text-ink-muted">
        Photographie d’illustration, hors Givors · {photo.author} · {photo.license}
      </figcaption>
    </figure>
  );
}
