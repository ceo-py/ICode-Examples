import { Avatar, Tooltip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

export function LogIn() {
    const navigate = useNavigate();

  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key={"logIn"}
      content="LogIn"
      color="primary"
    >
      <Avatar
        color="success"
        as="button"
        onClick={() => navigate('/login')}
        className="transition-transform bg-"
        size="xl"
        src="https://www.svgrepo.com/show/418012/user-scan.svg"
      />
    </Tooltip>
  );
}
