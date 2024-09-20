'use client'
import { usePageTitle } from "@/utils/hooks/usePageTitle";

interface PageTitleProps {
  classes?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({classes}) => {

  const title = usePageTitle()

  return (
    <div>
      <h1 className={classes || 'text-2xl ml-8'}>{title}</h1>
    </div>
  );
};

export default PageTitle