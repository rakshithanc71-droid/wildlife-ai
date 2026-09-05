import { Link } from 'react-router-dom'

export default function SectionHeader({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {linkTo && linkLabel && (
        <Link className="section-link" to={linkTo}>
          {linkLabel}
        </Link>
      )}
    </div>
  )
}
