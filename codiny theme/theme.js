const urlRegex =
  /(http[s]?|ftp):\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

window.onload = () => {
  const text2link = (pre) => {
    if (!pre.classList.contains("changed")) {
      pre.innerHTML = pre.innerHTML.replace(
        urlRegex,
        '<a href="$&" target="_blank" class="link">$&</a>'
      );
      pre.classList.add("changed");
    }
  };

  // 모든 pre 태그 초기 링크화
  document.querySelectorAll("pre").forEach(text2link);

  // 새로운 pre 태그 추가 시 자동 링크화를 위한 MutationObserver 설정
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "PRE") {
          text2link(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll("pre").forEach(text2link);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
