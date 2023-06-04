const bookHelper = {
    changeBookTypeToVN: (typebook) => {
        switch (typebook) {
            case 'all':
                return 'Tất cả';
            case 'title':
                return 'Nhan đề';
            case 'author':
                return 'Tác giả';
            default:
                return 'Tất cả';
        }
    },
    countBookByDate: (begin, end, data) => {
        const set = new Set();
        const beginTime = new Date(begin);
        const sBegin = beginTime.toJSON().slice(0, 10);
        const endTime = new Date(end);
        const sEnd = endTime.toJSON().slice(0, 10);

        const dateVNToGlobal = (s) => {
            const date = new Date();
            date.setFullYear(s.slice(6, 10));
            date.setMonth(s.slice(3, 5) - 1);
            date.setDate(s.slice(0, 2));
            return date.toJSON().slice(0, 10);
        };

        for (let i = 0; i < data.length; i++) {
            const dateBorrowedTime = dateVNToGlobal(data[i].dateBorrowed);
            const dateExpiredTime = dateVNToGlobal(data[i].dateExpired);
            // console.log(sBegin, sEnd, dateBorrowedTime, dateExpiredTime);
            if (dateBorrowedTime >= sBegin && dateBorrowedTime <= sEnd) {
                set.add(data[i].dateBorrowed);
            }
            if (dateExpiredTime >= sBegin && dateExpiredTime <= sEnd) {
                set.add(data[i].dateExpired);
            }
        }
        // console.log(set);
        const arr = new Array(set.size);
        let iOfArr = 0;
        for (const item of set) {
            arr[iOfArr] = {
                time: item,
                borrowedBooks: data.filter((ele) => {
                    return ele.dateBorrowed == item;
                }).length,
                expiredBooks: data.filter((ele) => {
                    return ele.dateExpired == item;
                }).length,
            };
            iOfArr++;
        }
        return arr;
    },
};

export default bookHelper;
