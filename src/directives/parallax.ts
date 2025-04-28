// directives/parallax.ts
export default {
  mounted(el: HTMLElement & { _onScroll?: () => void }, binding: any) {
    const factor = typeof binding.value === 'number' ? binding.value : 0.1;

    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        el.style.transform = 'translateY(0px)';
        return;
      }
      const offset = window.scrollY * -factor;
      el.style.transform = `translateY(${offset}px)`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    el._onScroll = handleScroll;
  },
  unmounted(el: HTMLElement & { _onScroll?: () => void }) {
    if (el._onScroll) {
      window.removeEventListener('scroll', el._onScroll);
    }
  },
};
