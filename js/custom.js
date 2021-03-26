 //$(document).ready(function() {
        function getData() {
            const getUserData = "getUserData";
            $.ajax({
                url: 'cases.php',
                type: 'GET',
                data: {
                    case: getUserData
                }
            }).done(function(response) {
                $('.userTable').html(response);
            });
        }
        //getData();
        // Update table every 60 seconds
        var intervalTiming = setInterval(getData(), 60000);
        // Delete function
        $('body').off('click', '.delete').on('click', '.delete', function() {
            var deleteid = $(this).data('id');
            const deleteCase = "deleteUser";
            console.log('DELETE', deleteid);
            // Check to confirm correct record
            var c = confirm("Are you sure you want delete this user?");
            if (c == true) {
                // AJAX Request
                $.ajax({
                    url: 'cases.php',
                    type: 'POST',
                    data: {
                        id: deleteid,
                        case: deleteCase
                    }
                }).done(function(response) {
                    getData();
                });
            } else {
                //Do nothing
                console.log("user", deleteid, "not deleted");
            }
        });

        //Edit
        $('body').off('click', '.edit').on('click', '.edit', function(e) {
            // Stop timer to allow for editing
            clearInterval(intervalTiming);
            // Set edit button to variable
            const editButton = $(e.target);
            var editid = $(this).data('id').toString();
            // Set delete button to variable
            const deleteButton = $(`.delete[data-id=${editid}]`);
            console.log('EDITING', editid);
            // Email
            // Find correct table data column
            const emailFieldChange = editButton.closest('tr').find('.emailResult');
            // Set variable to value of td column
            const emailCurValue = emailFieldChange.text();
            // Set result as input with data inside
            emailFieldChange.html(`<input class="form-control form-control-user primary" value="${emailCurValue}" />`);
            // Fname
            // Find correct table data column
            const fNameFieldChange = editButton.closest('tr').find('.fNameResult');
            // Set variable to value of td column
            const fNameCurValue = fNameFieldChange.text();
            // Set result as input with data inside
            fNameFieldChange.html(`<input class="form-control form-control-user primary" value="${fNameCurValue}" />`);
            // Lname
            // Find correct table data column
            const lNameFieldChange = editButton.closest('tr').find('.lNameResult');
            // Set variable to value of td column
            const lNameCurrValue = lNameFieldChange.text();
            // Set result as input with data inside
            lNameFieldChange.html(`<input class="form-control form-control-user primary" value="${lNameCurrValue}" />`);
            // Job
            // Find correct table data column
            const jobFieldChange = editButton.closest('tr').find('.jobResult');
            // Set variable to value of td column
            const jobCurrValue = jobFieldChange.text();
            // Set result as input with data inside
            jobFieldChange.html(`<input class="form-control form-control-user primary" value="${jobCurrValue}" />`);
            // Access level
            // Find correct table data column
            const accessFieldChange = editButton.closest('tr').find('.accessResult');
            // Set variable to value of td column
            const accessCurrValue = accessFieldChange.text();
            // Set result as input with data inside
            accessFieldChange.html(`<select class="form-control form-control-user primary" id="access" name="access"><option value="pending">Pending</option><option value="user" selected>User</option><option value="admin">Admin</option></select>`);
            // Current course
            // Find correct table data column
            const courseFieldChange = editButton.closest('tr').find('.courseResult');
            // Set variable to value of td column
            const courseCurrValue = courseFieldChange.text();
            // Set result as input with data inside
            courseFieldChange.html(`<input class="form-control form-control-user primary" value="${courseCurrValue}" />`);
            // Class change to be able to run save & cancel functions
            // Turn edit button into save button
            editButton.html('Save');
            editButton.addClass('save');
            editButton.removeClass('bg-warning edit');
            editButton.addClass('bg-success');
            // Turn delete button into cancel button
            deleteButton.html('Cancel');
            deleteButton.addClass('cancel');
            deleteButton.removeClass('bg-danger delete');
            deleteButton.addClass('bg-primary');
        });

        // Save
        $('body').off('click', '.save').on('click', '.save', function(e) {
            // Set save button to variable
            const saveButton = $(e.target);
            var saveid = $(this).data('id').toString();
            const saveCase = "saveUser";
            // Set cancel button to variable
            const cancelButton = $(`.cancel[data-id=${saveid}]`);
            var email = $('.emailResult').find('input').val();
            var fname = $('.fNameResult').find('input').val();
            var lname = $('.lNameResult').find('input').val();
            var job = $('.jobResult').find('input').val();
            var access = $('.accessResult').find('select').val();
            var course = $('.courseResult').find('input').val();
            // Check to confirm correct record
            var c = confirm("Are you sure you want to save the inputted details for this user?");
            console.log('SAVING', saveid);
            if (c == true) {
                // AJAX Request
                $.ajax({
                    url: 'cases.php',
                    type: 'POST',
                    data: {
                        id: saveid,
                        email: email,
                        fname: fname,
                        lname: lname,
                        job: job,
                        access: access,
                        course: course,
                        case: saveCase
                    }
                }).done(function(response) {
                    // Restart timer
                    intervalTiming = setInterval(getData(), 60000);
                    // Paste new values back into table so you don't need to refresh
                    // Email
                    const newEmailValue = email;
                    const emailField = saveButton.closest('tr').find('.emailResult');
                    const emailValue = emailField.html();
                    emailField.html(newEmailValue);
                    // Fname
                    const newFnameValue = fname;
                    const fNameField = saveButton.closest('tr').find('.fNameResult');
                    const FnameValue = fNameField.html();
                    fNameField.html(newFnameValue);
                    // Lname
                    const newLnameValue = lname;
                    const lNameField = saveButton.closest('tr').find('.lNameResult');
                    const LnameValue = lNameField.html();
                    lNameField.html(newLnameValue);
                    // Job
                    const newJobValue = job;
                    const jobField = saveButton.closest('tr').find('.jobResult');
                    const jobValue = jobField.html();
                    jobField.html(newJobValue);
                    // Access
                    const newAccessValue = access;
                    const accessField = saveButton.closest('tr').find('.accessResult');
                    const accessValue = accessField.html();
                    accessField.html(newAccessValue);
                    // Course
                    const newCourseValue = course;
                    const courseField = saveButton.closest('tr').find('.courseResult');
                    const courseValue = courseField.html();
                    courseField.html(newCourseValue);
                    // Turn save button into edit button
                    saveButton.html('Edit');
                    saveButton.addClass('edit');
                    saveButton.removeClass('bg-success save');
                    saveButton.addClass('bg-warning');
                    // Turn cancel button into delete button
                    cancelButton.html('Delete');
                    cancelButton.addClass('delete');
                    cancelButton.removeClass('bg-primary cancel');
                    cancelButton.addClass('bg-danger');
                });
            } else {
                //Do nothing
                console.log("user", saveid, "not edited");
            }

        });
        //Cancel
        $('body').off('click', '.cancel').on('click', '.cancel', function(e) {
            // Set cancel button to variable
            const cancelButton = $(e.target);
            var saveid = $(this).data('id').toString();
            var oldEmail = $('.emailResult').text();
            var oldFname = $('.fNameResult').text();
            var oldLname = $('.lNameResult').text();
            var oldJob = $('.jobResult').text();
            var oldAccess = $('.accessResult').text();
            var oldCourse = $('.courseResult').text();
            // Set save button to variable
            const saveButton = $(`.save[data-id=${saveid}]`);
            // Paste old values back into table so you don't need to refresh
            // Email
            const oldEmailValue = oldEmail;
            const emailField = cancelButton.closest('tr').find('.emailResult');
            emailField.html(oldEmailValue);
            // Fname
            const oldFnameValue = oldFname;
            const fNameField = cancelButton.closest('tr').find('.fNameResult');
            fNameField.html(oldFnameValue);
            // Lname
            const oldLnameValue = oldLname;
            const lNameField = cancelButton.closest('tr').find('.lNameResult');
            lNameField.html(oldLnameValue);
            // Job
            const oldJobValue = oldJob;
            const jobField = saveButton.closest('tr').find('.jobResult');
            jobField.html(oldJobValue);
            // Access
            const oldAccessValue = oldAccess;
            const accessField = saveButton.closest('tr').find('.accessResult');
            accessField.html(oldAccessValue);
            // Course
            const oldCourseValue = oldCourse;
            const courseField = saveButton.closest('tr').find('.courseResult');
            courseField.html(oldCourseValue);
            // Turn cancel button into delete button
            cancelButton.html('Delete');
            cancelButton.addClass('delete');
            cancelButton.removeClass('bg-primary cancel');
            cancelButton.addClass('bg-danger');
            // Turn save button into edit button
            saveButton.html('Edit');
            saveButton.addClass('edit');
            saveButton.removeClass('bg-success save');
            saveButton.addClass('bg-warning');
        });
   // });