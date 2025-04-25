import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Moon, Settings, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { Link, useLocation } from "react-router";
import { getUserFromToken } from "../../utils/auth";

const SidePanel = () => {
  const token = useSelector((state: RootState) => state.auth.token); // Получаем токен из хранилища
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = token ? getUserFromToken(token) : null; // Получаем пользователя из токена
    if (user !== null) {
      setUsername(user.username);
      setIsLogin(true);
    }
  }, [token]); // Добавляем зависимость от token

  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    { href: "/dashboard", label: "Личный кабинет" },
    { href: "/plan", label: "План тренировок" },
    { href: "/charts", label: "Графики показателей" },
    { href: "/history", label: "История активностей" },
  ];

  return (
    <div className="SidePanel w-24/100 h-screen flex flex-col justify-between bg-menu text-foreground p-6 box-border fixed">
      <div className="Menu flex flex-col justify-evenly gap-6 text-xl text-muted">
        <h3 className="text-primary text-4xl font-bold">BaobabTrain</h3>
        {isLogin ? (
          <h4 className="text-accent mb-10 text-2xl">Привет, {username}</h4>
        ) : (
          <Link className="text-accent border-b-1 border-menu mb-10 hover:border-accent w-fit" to="/login">
            вход/регистрация
          </Link>
        )}
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`${pathname === link.href ? "text-foreground font-semibold" : ""} hover:text-secondary`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="subMenu flex w-full justify-between">
        <Link to="/settings">
          <Settings className="text-primary hover:text-secondary" size={25} />
        </Link>
        <ThemeToggle
          darkLabel={<Moon className="text-primary hover:text-secondary" size={25} />}
          lightLabel={<Sun className="text-primary hover:text-secondary" size={25} />}
        />
      </div>
    </div>
  );
};

export default SidePanel;