import { colors } from '@material-ui/core'

export const faq = {
  account: {
    title: 'General Questions',
    subtitle: 'Let’s try to fix your general issues.',
    icon: 'fas fa-user',
    color: colors.amber,
    items: [
      {
        title: 'What is my order status?',
        updated: '1 week ago',
      },
      {
        title: 'Do you have a physical store?',
        updated: 'a day ago',
      },
      {
        title: 'Where do I leave a review?',
        updated: '2 month ago',
      },
      {
        title: 'I cannot login or reset password.',
        updated: '4 days ago',
      },
    ],
  },
  billing: {
    title: 'Checkout Issues',
    subtitle: 'Let’s try to fix your checkout & billing issues.',
    icon: 'fas fa-dollar-sign',
    color: colors.indigo,
    items: [
      {
        title: 'Is it safe to input my credit card?',
        updated: '1 week ago',
      },
      {
        title: 'My credit card is being declined.',
        updated: 'a day ago',
      },
      {
        title: 'I cannot checkout, can I call and pay over the phone instead?',
        updated: '2 month ago',
      },
      {
        title: 'Do you accept pre-paid credit cards?',
        updated: '4 days ago',
      },
    ],
  },
  organizations: {
    title: 'Product Inquiries',
    subtitle: 'Let’s try to find answers about products.',
    icon: 'fas fa-users',
    color: colors.deepPurple,
    items: [
      {
        title: 'One of my items hasn not arrived / is damaged.',
        updated: '1 week ago',
      },
      {
        title: 'Can I return a product?',
        updated: 'a day ago',
      },
      {
        title: 'I tried the product but I dont like it',
        updated: '2 month ago',
      },
      {
        title: 'I have received an expired product.',
        updated: '4 days ago',
      },
    ],
  },
  customizing: {
    title: 'Shipping Inquiries',
    subtitle: 'Let’s try to fix your shipping issues.',
    icon: 'fas fa-puzzle-piece',
    color: colors.blue,
    items: [
      {
        title: 'How long does delivery take?',
        updated: '1 week ago',
      },
      {
        title: 'How much does shipping cost?',
        updated: 'a day ago',
      },
      {
        title: 'What happens if I am not home to receive my order?',
        updated: '2 month ago',
      },
      {
        title: 'Can I have my package left at the Post Office?',
        updated: '4 days ago',
      },
    ],
  },
}
