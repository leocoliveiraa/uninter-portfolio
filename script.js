// Aguardar o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // ===== FUNCIONALIDADE DO MENU HAMBURGUER =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Abrir/fechar menu ao clicar no hamburguer
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animação das linhas do hamburguer
    hamburger.classList.toggle("active");
  });

  // ===== FECHAR MENU AO CLICAR EM LINKS (MOBILE) =====
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Fechar menu mobile quando clicar em um link
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      navMenu.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Impedir envio real do formulário

      // Pegar dados do formulário
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();

      // Validação básica
      if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
      }

      // Validar formato do email
      if (!isValidEmail(email)) {
        alert("Por favor, insira um email válido!");
        return;
      }

      // Simular envio bem-sucedido
      alert(
        `Obrigado ${nome}! Sua mensagem foi enviada com sucesso. Retornarei em breve através do email ${email}!`
      );

      // Limpar formulário
      contactForm.reset();
    });
  }

  // ===== EFEITO NO HEADER AO FAZER SCROLL =====
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY > 100) {
      // Header mais opaco quando rola a página
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
      // Header normal no topo
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });

  // ===== HIGHLIGHT DO MENU ATIVO =====
  // Detectar seção visível e destacar link correspondente
  const sections = document.querySelectorAll(".section, .hero");
  const menuLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150; // Offset para header fixo
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Destacar link ativo
    menuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ===== ANIMAÇÃO DOS CARDS DE TECNOLOGIA =====
  const techItems = document.querySelectorAll(".tech-item");
  const projectCards = document.querySelectorAll(".project-card");

  // Observer para animações ao aparecer na tela
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  [...techItems, ...projectCards].forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "all 0.6s ease";
    observer.observe(item);
  });

  // ===== SCROLL SUAVE MELHORADO =====
  // Complementar o CSS scroll-behavior com JavaScript
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== EFEITO DE DIGITAÇÃO CORRIGIDO =====
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    // Texto original que queremos "digitar"
    const originalText =
      'Olá, eu sou <span class="highlight">Leonardo Oliveira</span>';

    // Limpar o conteúdo inicial
    typingElement.innerHTML = "";

    let i = 0;
    let isTag = false;
    let tagBuffer = "";

    const typeWriter = () => {
      if (i < originalText.length) {
        const char = originalText.charAt(i);

        // Detectar início de tag HTML
        if (char === "<") {
          isTag = true;
          tagBuffer = char;
        }
        // Detectar fim de tag HTML
        else if (char === ">" && isTag) {
          isTag = false;
          tagBuffer += char;
          typingElement.innerHTML += tagBuffer;
          tagBuffer = "";
        }
        // Se estamos dentro de uma tag, adicionar ao buffer
        else if (isTag) {
          tagBuffer += char;
        }
        // Se não estamos em uma tag, adicionar o caractere normalmente
        else {
          typingElement.innerHTML += char;
        }

        i++;
        // Velocidade variável - mais rápido para tags, normal para texto
        const speed = isTag ? 10 : 80;
        setTimeout(typeWriter, speed);
      } else {
        // Adicionar cursor piscando no final
        setTimeout(() => {
          typingElement.innerHTML += '<span class="typing-cursor">|</span>';

          // Remover cursor após 3 segundos
          setTimeout(() => {
            const cursor = typingElement.querySelector(".typing-cursor");
            if (cursor) cursor.remove();
          }, 3000);
        }, 500);
      }
    };

    // Iniciar efeito após um delay
    setTimeout(typeWriter, 1000);
  }

  console.log("🚀 Portfólio carregado com sucesso!");
});

// ===== FUNÇÕES AUXILIARES =====

// Validar formato de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para detectar se é dispositivo móvel
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Debounce para otimizar eventos de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Scroll otimizado com debounce
const optimizedScroll = debounce(function () {
  // Código de scroll otimizado pode ser adicionado aqui
}, 10);
