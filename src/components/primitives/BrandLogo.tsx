interface Props {
  className?: string;
}

export function BrandLogo({ className = '' }: Props) {
  return (
    <img
      src="/vedarc-logo.png"
      alt="VedArc Legal"
      className={className}
      decoding="async"
      loading="eager"
    />
  );
}
