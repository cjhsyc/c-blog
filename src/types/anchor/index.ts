/** 锚点信息 */
export type Anchor = {
  tag: AnchorTagName
  slug: string
  content: string
}


export type AnchorTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'