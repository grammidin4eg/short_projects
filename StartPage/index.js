const LINKS_LIST = [{
        title: 'ВТБ',
        items: [{
                title: 'JIRA',
                href: 'https://task.corp.dev.vtb/secure/RapidBoard.jspa?rapidView=3931'
            },
            {
                title: 'Bitbucket',
                href: 'https://bitbucket.region.vtb.ru/getting-started?next=/'
            },
            {
                title: 'TeamCity',
                href: 'https://teamcity-cicdl.corp.dev.vtb/buildConfiguration/DBO2_Dbo2ci_FeConfirmationDocumentsReference_feconfirmationdocumentsreferencebuild?mode=builds'
            },
            {
                title: 'StoryBook',
                href: 'http://fe-storybook.ds5-genr02-dbor-ui1-test1.shard1.ds5-genr02.corp.dev.vtb'
            },
            {
                title: 'WIKI',
                href: 'https://wiki.corp.dev.vtb/index.action#all-updates'
            },
            {
                title: 'OpenShift',
                href: 'https://console-openshift-console.apps.ds5-genr02.corp.dev.vtb/k8s/ns/ds5-genr02-dbor-vk3-test1/pods'
            },
            {
                title: 'ТЗ',
                href: 'https://docs.google.com/document/d/1TQ-pKi3gyYt93QmwA-IAASu3pAQyEciaZs3sh9lYeDU/edit#heading=h.snu2gia8hkmp'
            },
            {
                title: 'FF2',
                href: 'https://wiki.corp.dev.vtb/display/INTERNETBANKKIB/FF_New_2+v2'
            },
            {
                title: 'Почта ВТБ',
                href: 'https://outlook.dev.vtb.ru/owa/#path=/mail/inbox'
            }
        ]
    },
    {
        title: 'EPAM',
        items: [{
                title: 'EPAM APP',
                href: 'https://menu.epam.com/app'
            },
            {
                title: 'Time',
                href: 'https://time.epam.com/'
            },
            {
                title: 'Vacation',
                href: 'https://vacation.epam.com/'
            },
            {
                title: 'Переводчик',
                href: 'https://translate.yandex.ru/'
            },
            {
                title: 'HR-Link',
                href: 'https://sign.epam.com/employee/documents'
            }
        ]
    },
    {
        title: 'Текущие',
        items: [{
                title: 'Спринт',
                href: 'https://task.corp.dev.vtb/browse/VTBDBOVKT-2732?filter=72156'
            }
        ]
    }
];

const gotoForm = document.getElementById('gotoform');
const goto = document.getElementById('goto');
const links = document.getElementById('links');
gotoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (goto.value) {
        const digitVal = parseInt(goto.value, 10);
        const prefix = isNaN(digitVal) ? '' : 'VTBDBOVKT-';
        window.location.href = `https://task.corp.dev.vtb/browse/${prefix}${goto.value}`;
    }
});

function renderItem(item) {
    const newLink = document.createElement("a");
    newLink.innerHTML = item.title;
    newLink.setAttribute('href', item.href);

    const newLinkContainer = document.createElement("span");
    newLinkContainer.classList.add("border", "border-secondary", "col-1", "text-center", "py-4", "mx-2", "bg-warning", "link");
    newLinkContainer.append(newLink);
    return newLinkContainer;
}

function renderCategory(category) {
    const newCatTitle = document.createElement("h3");
    newCatTitle.classList.add("mt-5");
    newCatTitle.innerHTML = category.title;

    const newCatContainer = document.createElement("div");
    newCatContainer.classList.add("row", "my-2");

    category.items.forEach(item => {
        const itemRender = renderItem(item);
        newCatContainer.append(itemRender);
    });

    links.append(newCatTitle);
    links.append(newCatContainer);
}

function renderList() {
    LINKS_LIST.forEach(category => {
        renderCategory(category);
    });
}

renderList();