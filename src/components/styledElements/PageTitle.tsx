'use client'
import { getPageTitle } from "@/utils/getPageTitle"

interface PageTitleProps {
  classes?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({classes}) => {

  return (
    <div>
      <h1 className={classes || 'text-2xl ml-8'}>{getPageTitle()}</h1>
    </div>
  );
};

export default PageTitle