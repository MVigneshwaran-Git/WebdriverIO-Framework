module.exports= function element(pageObjRepo,elementName){
    const locatorObject= pageObjRepo.find((pageObjRepo)=>pageObjRepo.element==elementName);
    const locator = locatorObject?.value;
    return locator;
}