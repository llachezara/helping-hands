# HelpingHands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Introduction
HelpingHands is a platform dedicated to connecting compassionate volunteers with elders in need of assistance and companionship. In today's fast-paced world, many elders find themselves facing challenges such as loneliness, difficulty with everyday tasks, and a lack of access to essential services. At the same time, there are countless individuals eager to lend a helping hand and make a positive impact in their communities.

## Features
- User Registration and Authentication - Users can login, register and logout, based on their authentication status. If a user has not logged in, they are considered a 'guest' and can login or register, clicking on the buttons in the navigation bar. Only logged in or registered users can logout. After login, register and logout, a user will be redirected to the home page.

- User Opportunities - From the toggle side-nav, **all users can visit campaigns page, contacts page and home page**. In the campaigns page, they can see all of the created campaigns.
    
  - Creating a Campaign -  Users can create a campaign, **only if they are already logged in their profile(if they are not a guest)**. Clicking on the *create* button in the navigation bar, will open the create page. A user must provide a title, description, start date, end date, their contact telephone and a region. They can also provide an image url(it is optional). By default if not provided - the image url will be set to a default campaign's image, containing the logo of HelpingHands. An owner can view their created campaigns in their profile page. Owners of campaigns must have in mind, that a **campaign's maximum duration is 30 days from the start date** and after that they won't be able to edit their campaign data - the campaign will end. **If a campaign has ended, other users won't be able to sign up for it.**
    
  - Campaign Details - **All users can visit the details page** about a campaign. Only logged in users can sign up for campaign. Sign up users can see the owner details. If a user is the owner - they can see everything and edit and delete their campaign, clicking on the edit or delete buttons.
 
  - Sign Up for campaign - Users can sign up for campaign, clicking on the sign up button in details, if a campaign has not ended. After clicking the sign up buton, a dialog for confirmation dialog will be shown. After signing up, a user will be able to see the message "You have signed up for this campaign. :)" and the owner details. If a campaign has ended, they will see another message.
    
  - Campaign Edit - Only the owner of a campaign can edit their campaign data.
    
  - Campaign Delete - Only the owner of a campaign can delete their campaign. By clicking on the delete button, a dialog will be shown to confirm owner's decision. **After delition, the campaign is permanently deleted from the Firebase Cloud Firestore DB.**
    
  - User Profile - Only logged in users can visit their profile page. Clicking on the profile button in navigation will open the profile page. There, users can see the campaigns, they have signed up for and the ones they have created. Clicking on the details button will render the details page. *If a user has not signed up for any campaigns or has not created any, corresponding messages will be shown.*

- Validation and error messages - all input fields for forms are validated. If an input field is not valid, the whole form becomes invalid. Ivalid forms cannot be submitted. Error messages will be shown.

## Getting Started

To get started with this project, follow these steps:

### Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/llachezara/helping-hands.git
```
### Install Dependencies
Once you have cloned the repository, navigate into the project directory and install the dependencies using npm. Run the following command:
```bash
npm ci
```
This will install all the required dependencies listed in the package.json file.

### Serve the Application
After installing the dependencies, you can serve the application locally using Angular CLI's ng serve command. Run the following command:

```bash
npx ng serve
```
By default, the application will be served on http://localhost:4200/. You can specify a different port using the --port flag. For example:

```bash
npx ng serve --port 3000
```
This will serve the application on http://localhost:3000/.

### Usage
Once the application is running, you can access it through your web browser using the specified port.
