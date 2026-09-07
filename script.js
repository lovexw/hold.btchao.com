// 慢者生存 — 交互脚本

document.addEventListener('DOMContentLoaded', function() {

  // ====== 阅读进度条 ======
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ====== 回到顶部 ======
  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    const toggleBackTop = () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBackTop, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== 移动端目录面板 ======
  const mobileToc = document.querySelector('.mobile-toc');
  const tocPanel = document.querySelector('.toc-panel');
  const tocOverlay = document.querySelector('.toc-overlay');

  if (mobileToc && tocPanel) {
    mobileToc.addEventListener('click', () => {
      tocPanel.classList.add('open');
      if (tocOverlay) tocOverlay.classList.add('open');
    });

    if (tocOverlay) {
      tocOverlay.addEventListener('click', () => {
        tocPanel.classList.remove('open');
        tocOverlay.classList.remove('open');
      });
    }

    // 点击链接后关闭
    tocPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        tocPanel.classList.remove('open');
        if (tocOverlay) tocOverlay.classList.remove('open');
      });
    });
  }

  // ====== 桌面端侧边目录高亮 ======
  const tocSidebarLinks = document.querySelectorAll('.toc-sidebar a');
  const headings = document.querySelectorAll('article.al h3');

  if (tocSidebarLinks.length > 0 && headings.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocSidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    headings.forEach(h => observer.observe(h));
  }

  // ====== 导航栏简化菜单 ======
  const navMenuBtn = document.querySelector('.nav-menu-btn');
  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', () => {
      window.location.href = 'index.html#contents';
    });
  }

});
