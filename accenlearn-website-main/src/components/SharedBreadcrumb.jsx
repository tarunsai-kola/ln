import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"

const SharedBreadcrumb = ({to, title, dark = false}) => {
  const breadcrumbItems = [
    {
      title: <Link to="/" className={`${dark ? '!text-slate-300' : '!text-primary'} font-bold`}>Home</Link>,
    },
    {
      title: <Link to={to} className={`${dark ? '!text-white' : '!text-secondary'} font-bold`}>{title}</Link>,
    },
  ];

  return (
    <div>
      <Breadcrumb 
        separator="<"
        items={breadcrumbItems}
      />
    </div>
  )
}

export default SharedBreadcrumb