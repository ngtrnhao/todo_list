import React from 'react';
import ScrollBaseAnimation from '../animations/ScrollBaseAnimation';

function Header() {
  return (
    <div className="header-container">
      <ScrollBaseAnimation 
        baseVelocity={-3} 
        delay={500}
        clasname="header-text-style"
      >
        Welcome To My Todo App ✨
      </ScrollBaseAnimation>
      <ScrollBaseAnimation 
        baseVelocity={3}
        delay={500} 
        clasname="header-text-style"
      >
        Let's Get Things Done! 🚀
      </ScrollBaseAnimation>
    </div>
  );
}

export default Header;
