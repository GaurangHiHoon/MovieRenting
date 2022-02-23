import _ from "lodash";

export function paginating(movies,pageSize,currentPage){
    const startIndex=(currentPage-1)*pageSize;
    return _(movies).slice(startIndex).take(pageSize).value();
}