declare namespace React {
  interface AsyncFunctionComponent<P = {}> {
    (
      props: P,
      context?: unknown
    ): Promise<ReactElement<unknown, unknown> | null>;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<unknown> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  type AFC<P = {}> = AsyncFunctionComponent<P>;
}
