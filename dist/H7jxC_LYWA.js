lucide.createIcons();
document.querySelectorAll('.quip-wrapper').forEach(wrapper => {
			const tooltip = wrapper.querySelector('.quip-tooltip');
			if (!tooltip) return;

			wrapper.addEventListener('mouseenter', () => adjustTooltip(wrapper, tooltip));
			wrapper.addEventListener('focus', () => adjustTooltip(wrapper, tooltip));
			});

			function adjustTooltip(wrapper, tooltip) {
			tooltip.style.left = '50%';
			tooltip.style.transform = 'translateX(-50%)';

			requestAnimationFrame(() => {
				const rect = tooltip.getBoundingClientRect();
				const padding = 10;

				if (rect.left < padding) {
				tooltip.style.left = `${padding}px`;
				tooltip.style.transform = 'none';
				} else if (rect.right > window.innerWidth - padding) {
				tooltip.style.left = 'auto';
				tooltip.style.right = `${padding}px`;
				tooltip.style.transform = 'none';
				}
			});
			}