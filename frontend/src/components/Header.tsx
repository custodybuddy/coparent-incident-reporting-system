type HeaderProps = {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="text-muted-foreground text-base">{subtitle}</p>
      ) : null}
    </header>
  )
}
