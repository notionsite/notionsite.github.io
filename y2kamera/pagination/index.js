const removeChildren = (parent) => {
    while (parent.hasChildNodes()) {
      parent.firstChild.remove()
    }
  };
  
  const switchPage = (next, paginated, pagination) => {
    const selected = document.getElementsByClassName("selected")[0];
    const currPage = parseInt(selected.innerText);
    console.log({ currPage });
    let newPage = currPage;
    if (next) {
      console.log("next")
      newPage = currPage + 1;
    } else {
      console.log("previous")
      newPage = currPage - 1;
    }
    if (newPage > 0 && newPage <= paginated.length) {
      console.log({ newPage });
      onPageClick(newPage, paginated, pagination);  
    }
  }
  
  const onPageClick = (page, paginated, pagination) => {
    console.log({ page });
    console.log({ pagination });
    console.log({ children: pagination.children });
    const idxs = Array.from(pagination.children);
    idxs.forEach(el => {
      if (parseInt(el.innerText) === page) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
    
    const collection = document.getElementsByClassName("notion-collection-gallery")[0];
    removeChildren(collection);
    
    paginated[page - 1].forEach((el) =>{
      el.style.display = "block";
      collection.appendChild(el);
    });
  };
  
  const chunkCollection = (pageSize) => {
    const collection = document.getElementsByClassName("notion-collection-gallery");
    console.log(collection);
    const pictures = Array.from(collection[0].childNodes);
    console.log(pictures);
    
    const paginated = [];
    for (let i = 0; i < pictures.length; i += pageSize) {
      const chunk = pictures.slice(i, i + pageSize);
      paginated.push(chunk);
    }
    return paginated;
  };
  
  const addPagination = (paginated) => {
    const pageAmount = paginated.length;
    const pages = Array.from(Array(pageAmount).keys()).map((i) => i + 1);
    
    const paginationBlock = document.getElementsByClassName("notion-column-list")[1].children;
    console.log({ paginationBlock })
    console.log({ paginationBlockLength: paginationBlock.length })
    
    let pagination;
    
    if (paginationBlock.length === 1) {
      pagination = paginationBlock[0];
    } else {
      pagination = paginationBlock[1];
      previous = paginationBlock[0];
      next = paginationBlock[2];
      console.log({previous})
      
      previous.onclick = () => switchPage(false, paginated, pagination);
      next.onclick = () => switchPage(true, paginated, pagination);
    }
    
    removeChildren(pagination);
  
    pages.forEach(page => {
      const div = document.createElement("div");
      const idx = document.createTextNode(page);
      div.appendChild(idx);
      div.className = "pagination-idx";
      div.onclick = (e) => {
        const page = parseInt(e.target.innerText);
        onPageClick(page, paginated, pagination);
      };
      pagination.appendChild(div);
    });
    
    onPageClick(1, paginated, pagination);
  };
  
  window.addEventListener('load', function () {
    const paginated = chunkCollection(9);
    console.log({ paginated });
  
    addPagination(paginated);
  });