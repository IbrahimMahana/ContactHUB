// Declaration Var
var profileImageInput = document.getElementById("profileImage");
var fullNameInput = document.getElementById("fullName");
var PhoneNumberInput = document.getElementById("PhoneNumber");
var EmailInput = document.getElementById("Email");
var AddressInput = document.getElementById("Address");
var NotesInput = document.getElementById("Notes");
var contactGroup = document.getElementById("contactGroup");

var saveContactBtn = document.getElementById("saveContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");
var scrollModal = document.getElementById("scrollModal");

var contactsCountText = document.getElementById("contactsCountText");
var totalCount = document.getElementById("totalCount");
var favorite = document.getElementById("favCount");
var emergency = document.getElementById("emergencyCount");
// Check statue
var favoriteCheckbox = document.getElementById("favorite");
var emergencyCheckbox = document.getElementById("emergency");

var favoritesList = document.getElementById("favoritesList");
var emergencyList =document.getElementById("emergencyList");

var contactsContainer = document.getElementById("contactsContainer");
// Validation Elements
var nameErrorMsg = document.getElementById("nameErrorMsg");
var phoneErrorMsg = document.getElementById("phoneErrorMsg");
var emailErrorMsg = document.getElementById("emailErrorMsg");

var indexAfterUpdate;
// Content Stor of Array
var contactUser;
if (localStorage.getItem("contact") != null) {
	contactUser = JSON.parse(localStorage.getItem("contact"));
	displayContact(contactUser);
} else {
	contactUser = [];
}
function addContact() {

    // =====  Check Duplicate Phone ===== //
    if(isDuplicatePhone()){
        Swal.fire({
            title: "Error!",
            text:"Phone number already exists.",
            icon: "error"
        });
        return;
    }
    // ===== Form Validation ===== //
    if(!validateForm()){
        Swal.fire({
            title: "Error!",
            text:"Please enter valid data.",
            icon: "error"
        });

        return;
    }

	var contact = {
		Image: profileImageInput.files[0] ? "images/" + profileImageInput.files[0].name : "",
		nameUser: fullNameInput.value,
		phoneUser: PhoneNumberInput.value,
		emailUser: EmailInput.value,
		addressUser: AddressInput.value,
		notes: NotesInput.value,
        group: contactGroup.value,
        isFavorite: favoriteCheckbox.checked,
        isEmergency : emergencyCheckbox.checked,
	};
	contactUser.push(contact);

    localStorage.setItem("contact" , JSON.stringify(contactUser));
    displayContact(contactUser);
    // Sweet Alert
	Swal.fire({
        title: "Added!",
        text:"Contact has been added successfully.",
        icon: "success",
        draggable: true
    });

    clearForm();
}

function clearForm(){
    profileImageInput.value = null;
    fullNameInput.value = null;
    PhoneNumberInput.value = null; 
    EmailInput.value = null; 
    AddressInput.value = null; 
    NotesInput.value = null; 
    contactGroup.value = null;
    favoriteCheckbox.checked = false;
    emergencyCheckbox.checked = false;
}
function displayContactsCount(){
    contactsCountText.innerHTML = `Manage and organize your ${contactUser.length} contacts`;
    totalCount.innerHTML = `${contactUser.length}`;
}
// Get Initials (Concatenate FirstName + LastName)
function getInitials(fullNameInput){
    // Empty Name
    if(!fullNameInput){
        return "";
    }
    var name = fullNameInput.trim().split(" ");
    var firstLatter = name[0][0];

    if(name.length > 1){
        var secondLatter = name[1][0];
        return firstLatter + secondLatter;
    }else{
        return firstLatter;
    }
}
function displayContact(arr) {
    
	var box = ``;
	for (var index = 0; index < arr.length; index++) {
    // groupBadge
    var groupBadge = "";
    switch(arr[index].group){
        case "family":
            groupBadge = `<span class="family-badge group-badge">${arr[index].group}</span>`;
            break;
        case "work":
            groupBadge = `<span class="work-badge group-badge">${arr[index].group}</span>`;
            break;
        case "friends":
            groupBadge = `<span class="friend-badge group-badge">${arr[index].group}</span>`;
            break;
        case "school":
            groupBadge = `<span class="school-badge group-badge">${arr[index].group}</span>`;
            break;
        case "other":
            groupBadge = `<span class="other-badge group-badge">${arr[index].group}</span>`;
        break;
    }
        // ADD Favorite Badge
        var favoriteBadge = "";
        if(arr[index].isFavorite == true){

            favoriteBadge = `
            <div class="favorite-badge position-absolute d-flex align-items-center justify-content-center rounded-circle">
                <i class="fa-solid fa-star text-white"></i>
            </div>
            `;
        }
        // Count Fav Icon in UI
		var starIcon;

		if(arr[index].isFavorite == true){
			starIcon =`<i class="fa-solid fa-star text-warning"></i>`;
		}else{
			starIcon = `<i class="fa-regular fa-star text-secondary-muted"></i>`;
		}
        // ADD Emergency Badge
        var emergencyBadge = "";
        if(arr[index].isEmergency == true){

            emergencyBadge = `
            <div class="emergency-badge position-absolute d-flex align-items-center justify-content-center rounded-circle">
                <i class="fa-solid fa-heart-pulse text-white"></i>
            </div>
            `;
        }
        // Count Emergency Icon in UI
        var emergencyIcon;
        if(arr[index].isEmergency == true){
			emergencyIcon =`<i class="fa-solid fa-heart-pulse text-danger"></i>`;
		}else{
			emergencyIcon = `<i class="fa-regular fa-heart text-secondary-muted"></i>`;
		}
		box += `
        <div class="col-md-6">
        <div class="d-flex flex-column contact-card overflow-hidden">
        <div class="p-3">
            <div class="d-flex column-gap-3 align-items-center">
                <div class="position-relative">
                
                   <div class="default-avatar contact-avatar d-flex justify-content-center align-items-center fw-bold text-white overflow-hidden rounded-4">
                        ${arr[index].Image != ""?
                        `<img src="${arr[index].Image}" class="w-100 h-100 object-fit-cover">`: getInitials(arr[index].nameUser)}
                    </div>
                    ${favoriteBadge}    

                    ${emergencyBadge}
                </div>

                <div>
                    <h3 class="fs-5 fw-bold mb-2">
                        ${arr[index].nameUser}
                    </h3>
                    <div class="d-flex gap-2 align-items-center">

                        <div class="phone-icon d-flex justify-content-center align-items-center rounded-3">
                            <i class="fa-solid fa-phone"></i>
                        </div>

                        <span class="text-secondary-muted">
                            ${arr[index].phoneUser}
                        </span>

                    </div>

                </div>

            </div>

            <div class="mt-3 d-flex gap-2 align-items-center">

                <div class="email-icon d-flex align-items-center justify-content-center rounded-3">
                    <i class="fa-solid fa-envelope"></i>
                </div>

                <span class="text-secondary-muted">
                    ${arr[index].emailUser}
                </span>

            </div>

            <div class="mt-2 d-flex gap-2 align-items-center">
                ${arr[index].addressUser?`
                <div class="d-flex align-items-center gap-2 mt-0">
                    <div class="location-icon d-flex justify-content-center align-items-center rounded-circle">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>

                <span class="text-secondary-muted">
                    ${arr[index].addressUser}
                </span>
                </div>`:""}

                </div>
                <div class="mt-2 d-flex">
                    ${groupBadge}
                </div>
            </div>

        <div class="p-2 card-footer">
            <div class="d-flex justify-content-between align-items-center">

                <div class="d-flex gap-2">

                    <button class="phone-icon d-flex justify-content-center align-items-center rounded-3 border-0">
                        <a href="tel:${arr[index].phoneUser}">  
                            <i class="fa-solid fa-phone"></i>
                        </a>  
                    </button>

                    <button class="email-icon d-flex justify-content-center align-items-center rounded-3 border-0">
                    <a href="mailto:${arr[index].emailUser}">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                    </button>
                </div>

                <div class="d-flex gap-2 text-secondary-muted">

                    <button class=" border-0 transition-effect" onclick= "favoritesContact(${index})">
                        ${starIcon}
                    </button>

                    <button class="border-0 transition-effect" onclick= "emergencyContact(${index})">
                        ${emergencyIcon}
                    </button>

                    <button class="border-0 transition-effect" onclick="setFormContact(${index})">
                        <i class="fa-solid fa-pen text-secondary-muted"></i>
                    </button>

                    <button class="border-0 transition-effect" onclick="deleteContact(${index})">
                        <i class="fa-solid fa-trash text-secondary-muted"></i>
                    </button>

                </div>

            </div>
        </div>
        </div>
        </div>`;
	}
    contactsContainer.innerHTML = box;
    displayContactsCount();
    displayFavoriteCount();
    displayEmergencyCount();
    displayFavoritePanel();
    displayEmergencyPanel();
}
// ============= Delete ============ //
function deleteContact(indexDeleteContact){
    // console.log(indexDeleteContact)
    
    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete ibrahim? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#606773",
        confirmButtonText: "Yes, delete it!",
        scrollbarPadding: false,
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete Contact
            contactUser.splice(indexDeleteContact , 1);

            localStorage.setItem("contact" , JSON.stringify(contactUser));
            displayContact(contactUser);

            Swal.fire({ 
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                scrollbarPadding: false,
            });
        
        }
    });
}
// ============= Update ============ //
function setFormContact(indexBeforeUpdate){
    indexAfterUpdate = indexBeforeUpdate;

    // profileImageInput.value = contactUser[indexBeforeUpdate].Image;
    fullNameInput.value = contactUser[indexBeforeUpdate].nameUser;
    PhoneNumberInput.value = contactUser[indexBeforeUpdate].phoneUser;
    EmailInput.value = contactUser[indexBeforeUpdate].emailUser;
    AddressInput.value = contactUser[indexBeforeUpdate].addressUser;
    NotesInput.value = contactUser[indexBeforeUpdate].notes;
    contactGroup.value = contactUser[indexBeforeUpdate].group;
    favoriteCheckbox.checked = contactUser[indexBeforeUpdate].isFavorite;
    emergencyCheckbox.checked = contactUser[indexBeforeUpdate].isEmergency;
    var myModal =
    new bootstrap.Modal(scrollModal);
    myModal.show();

    saveContactBtn.classList.add("d-none");
    updateContactBtn.classList.remove("d-none");
    
}
function updateContact(){
    if(!validateForm()){
        Swal.fire({
            title: "Error!",
            text:"Please enter valid data.",
            icon: "error"
        });
        return;
    }
    // ===== Check Duplicate Phone =====
    if(isDuplicatePhone()){
        Swal.fire({
            title: "Error!",
            text:"Phone number already exists.",
            icon: "error"
        });
        return;
    }

    // contactUser[indexAfterUpdate].Image = profileImageInput.value;
    contactUser[indexAfterUpdate].nameUser = fullNameInput.value;
    contactUser[indexAfterUpdate].phoneUser = PhoneNumberInput.value;
    contactUser[indexAfterUpdate].emailUser = EmailInput.value;
    contactUser[indexAfterUpdate].addressUser = AddressInput.value;
    contactUser[indexAfterUpdate].notes = NotesInput.value;
    contactUser[indexAfterUpdate].group = contactGroup.value;
    contactUser[indexAfterUpdate].isFavorite = favoriteCheckbox.checked;
    contactUser[indexAfterUpdate].isEmergency = emergencyCheckbox.checked;
    
    localStorage.setItem("contact" , JSON.stringify(contactUser));
    displayContact(contactUser);

    Swal.fire({
        title: "Updated!",
        text: "Contact updated successfully.",
        icon: "success"
    });

    saveContactBtn.classList.remove("d-none");
    updateContactBtn.classList.add("d-none");

    indexAfterUpdate = null;
    // Function Clear Form
    clearForm();
}
// =========== Search ============= //
function filterContacts(searchTerm){
    searchTerm = searchTerm.trim();
    var filteredList = [];
    for(var i = 0; i < contactUser.length; i++){
        if(
            contactUser[i].nameUser.toLowerCase().includes(searchTerm.toLowerCase()) || 
            contactUser[i].phoneUser.includes(searchTerm) || 
            (contactUser[i].emailUser && contactUser[i].emailUser.toLowerCase().includes(searchTerm.toLowerCase())))
        {
            filteredList.push(contactUser[i]);
        }
    }
    displayContact(filteredList);
}
// ============= ADD Fav ========== //
function favoritesContact(indexFav){
    // // Change favorite status (true ↔ false)
    contactUser[indexFav].isFavorite = !contactUser[indexFav].isFavorite;
    localStorage.setItem("contact" , JSON.stringify(contactUser));

    displayContact(contactUser);
}
function displayFavoriteCount(){
    var count = 0;
    for(var i = 0; i < contactUser.length; i++){

        if(contactUser[i].isFavorite == true){
            count++;
        }
    }
    favorite.innerHTML = count;
}
function displayFavoritePanel(){
    var favoriteListBox = ``;

    for(var i = 0; i < contactUser.length; i++){

        if(contactUser[i].isFavorite == true){

            favoriteListBox += `
            <div class="d-flex gap-2 fav-item align-items-center mb-3">
                <div class="flex-shrink-0 default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
                    ${getInitials(contactUser[i].nameUser)}
                </div>

                <div class="flex-grow-1">
                     <h4 class="m-0 fs-6">
                        ${contactUser[i].nameUser}
                    </h4>

                    <p class="m-0 phone-number">
                        ${contactUser[i].phoneUser}
                    </p>
                </div>

                <a
                    href="tel:${contactUser[i].phoneUser}"
                    class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0">

                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>`;
        }
    }
    if(favoriteListBox == ""){
        favoriteListBox = `
        <div class="emptyStateMsg text-center">
            <p class="text-secondary-muted fw-bold">
                No favorites yet
            </p>
        </div>`;
}
    favoritesList.innerHTML = favoriteListBox;
}
// ========== ADD Emergency ========= //
function emergencyContact(indexEmergency){
    contactUser[indexEmergency].isEmergency = !contactUser[indexEmergency].isEmergency;
    localStorage.setItem("contact" , JSON.stringify(contactUser));

    displayContact(contactUser);
}
function displayEmergencyCount(){
    var count = 0;
    for(var i = 0; i < contactUser.length; i++){
        if(contactUser[i].isEmergency == true){
            count++;
        }
    }
    emergency.innerHTML = count;
}
function displayEmergencyPanel(){
    var emergencyListBox = ``;

    for(var i = 0; i < contactUser.length; i++){

        if(contactUser[i].isEmergency == true){

            emergencyListBox += `
            <div class="d-flex gap-2 emergency-item align-items-center mb-3">
                <div class="flex-shrink-0 default-avatar contact-avatar d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
                    ${getInitials(contactUser[i].nameUser)}
                </div>

                <div class="flex-grow-1">
                     <h4 class="m-0 fs-6">
                        ${contactUser[i].nameUser}
                    </h4>

                    <p class="m-0 phone-number">
                        ${contactUser[i].phoneUser}
                    </p>
                </div>

                <a
                    href="tel:${contactUser[i].phoneUser}"
                    class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0">

                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>`;
        }
    }
    if(emergencyListBox == ""){
        emergencyListBox = `
        <div class="emptyStateMsg text-center">
            <p class="text-secondary-muted fw-bold">
                No Emergency yet
            </p>
        </div>`;
    }
    emergencyList.innerHTML = emergencyListBox;
}

// =========== Validation =========== //
function validateName(){
    var regex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
    if(regex.test(fullNameInput.value)){
        fullNameInput.classList.remove("is-invalid");
        nameErrorMsg.classList.add("d-none");
        return true;
    }else{
        fullNameInput.classList.add("is-invalid");
        nameErrorMsg.classList.remove("d-none");

        return false;
    }
}   
function validatePhone(){
    var regex = /^(\+20|0020|20)?0?1[0125][0-9]{8}$/;
    if(regex.test(PhoneNumberInput.value)){
        PhoneNumberInput.classList.remove("is-invalid");
        phoneErrorMsg.classList.add("d-none");

        return true;
    }else{
        PhoneNumberInput.classList.add("is-invalid");
        phoneErrorMsg.classList.remove("d-none");

        return false;
    }
}   
function validateEmail(){
    var regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if(EmailInput.value == "" ||regex.test(EmailInput.value)){
        EmailInput.classList.remove("is-invalid");
        emailErrorMsg.classList.add("d-none");

        return true;

    }else{
        EmailInput.classList.add("is-invalid");
        emailErrorMsg.classList.remove("d-none");

        return false;
    }
}
function validateForm(){

    var nameValid = validateName();
    var phoneValid = validatePhone();
    var emailValid = validateEmail();

    return nameValid && phoneValid && emailValid;
}
function isDuplicatePhone(){
    for(var i = 0; i < contactUser.length; i++){
        // ===== Ignore Current Updated Contact ===== //
        if(i != indexAfterUpdate &&contactUser[i].phoneUser == PhoneNumberInput.value){
            return true;
        }
    }
    return false;
}
