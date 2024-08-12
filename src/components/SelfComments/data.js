const data = [
  {
    id: 1,
    comment: "This is 1st comment",
    reply: [
      {
        id: 2,
        comment: "Reply for 1st comment",
        reply: [
          {
            id: 3,
            comment: "Nested Reply 1",
          },
        ],
      },
      {
        id: 4,
        comment: "2nd Reply for 1st comment",
        reply: [
          {
            id: 5,
            comment: "Nested Reply 2",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    comment: "This is 2nd comment",
    reply: [
      {
        id: 7,
        comment: "Reply for 2nd comment",
        reply: [
          {
            id: 8,
            comment: "Nested Reply 1",
          },
        ],
      },
      {
        id: 9,
        comment: "2nd Reply for 2nd comment",
        reply: [
          {
            id: 10,
            comment: "Nested Reply 2",
          },
        ],
      },
    ],
  },
];

export default data;
