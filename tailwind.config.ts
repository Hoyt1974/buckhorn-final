import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink:'#E8F0FF', bg:'#0B1020', muted:'#8AA0C8', accent:'#66A6FF', card:'#141B2D', line:'rgba(255,255,255,0.08)' }, boxShadow:{ soft:'0 10px 30px rgba(0,0,0,0.35)' } } },
  plugins: []
}
export default config
