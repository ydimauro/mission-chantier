import Image from "next/image";

type AppMarkProps = {
  size?: number;
  className?: string;
};

/**
 * Pictogramme de Mission Chantier fourni pour l’identité visuelle locale.
 */
export function AppMark({ size = 32, className }: AppMarkProps) {
  return (
    <Image
      src="/chantier.svg"
      alt="Mission Chantier"
      width={size}
      height={size}
      className={className}
    />
  );
}
