import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"

const SharedBreadcrumb = ({to, title}) => {
  const breadcrumbItems = [
    {
      title: <Link to="/" className="!text-primary font-bold">Home</Link>,
    },
    {
      title: <Link to={to} className="!text-secondary font-bold">{title}</Link>,
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