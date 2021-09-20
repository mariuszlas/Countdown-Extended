export const getCategoryCode = category => {
    switch (category) {
        case 'Any Category':
            return 'any';
        case 'General Knowledge':
            return '9';
        case 'Entertainment: Books':
            return '10';
        case 'Entertainment: Film':
            return '11';
        case 'Entertainment: Music':
            return '12';
        case 'Entertainment: Musicals & Theatres':
            return '13';
        case 'Entertainment: Television':
            return '14';
        case 'Entertainment: Video Games':
            return '15';
        case 'Entertainment: Board Games':
            return '16';
        case 'Science & Nature':
            return '17';
        case 'Science: Computers':
            return '18';
        case 'Science: Mathematics':
            return '19';
        case 'Mythology':
            return '20';
        case 'Sports':
            return '21';
        case 'Geography':
            return '22';
        case 'History':
            return '23';
        case 'Politics':
            return '24';
        case 'Art':
            return '25';
        case 'Celebrities':
            return '26';
        case 'Animals':
            return '27';
        case 'Vehicles':
            return '28';
        case ' Entertainment: Comics':
            return '29';
        case 'Science: Gadgets':
            return '30';
        case 'Entertainment: Japanese Anime & Manga':
            return '31';
        case 'Entertainment: Cartoon & Animations':
            return '32';
    }
};
