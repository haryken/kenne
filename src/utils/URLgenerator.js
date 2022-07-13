/*
Params:
size 
page
categories
states
query
sortBy
order
*/
export const generateFindAssetsURL = ({
  selectedCategoryList,
  selectedStateList,
  searchText,
  sortCriteria,
  currentPage,
  specificAssetID,
}) => {
  let url = `${process.env.REACT_APP_API_URL}/assets/find`;

  url += `?page=${currentPage}&size=10`;

  if (selectedCategoryList && selectedCategoryList.length > 0) {
    url += `&categories=${selectedCategoryList.join(',')}`;
  }

  if (selectedStateList && selectedStateList.length > 0) {
    url += `&state=${selectedStateList.join(',')}`;
  }

  if (searchText) {
    url += `&search=${searchText}`;
  }

  if (sortCriteria) {
    url += `&sortBy=${sortCriteria.sortBy}&order=${sortCriteria.order}`;
  }

  if (specificAssetID) {
    url += `&specificAssetID=${specificAssetID}`;
  }

  return url;
};
