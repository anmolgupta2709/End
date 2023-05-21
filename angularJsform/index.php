<?php
// database connection code
$con = mysqli_connect('localhost', 'root', '', 'test');
$result = mysqli_query($con, "SELECT * from contact");
// close database connection
mysqli_close($con);
?>

    <!DOCTYPE html>
    <html ng-app="myApp">

    <head>
        <title>User Info Form</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            
            h2 {
                color: #333;
            }
            
            form {
                margin-bottom: 20px;
            }
            
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            
            input[type='text'],
            input[type='email'],
            input[type='tel'] {
                padding: 5px;
                width: 250px;
                border: 1px solid #ccc;
                border-radius: 3px;
                margin-bottom: 10px;
            }
            
            .error-message {
                color: red;
                font-size: 12px;
                margin: 5px 0 10px 0;
            }
            
            button {
                padding: 8px 16px;
                background-color: #4caf50;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            table {
                border-collapse: collapse;
                width: 100%;
            }
            
            th,
            td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            
            th {
                background-color: #f2f2f2;
            }
            
            .success-alert {
                background-color: #7fff7f;
                color: #006400;
                padding: 10px;
                margin-bottom: 10px;
            }
            
            .error-alert {
                background-color: #ff7f7f;
                color: #8b0000;
                padding: 10px;
                margin-bottom: 10px;
            }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.9/angular.min.js"></script>
    </head>

    <body ng-controller="myController">
        <h2>User Info Form</h2>

        <form name="userInfoForm" novalidate action="test.php" method="POST">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" ng-model="userInfo.name" required />
            <div class="error-message" ng-show="userInfoForm.name.$error.required && userInfoForm.name.$touched">
                Please enter your name.
            </div>

            <label for="email">Email:</label>
            <input type="email" name="email" id="email" ng-model="userInfo.email" required />
            <div class="error-message" ng-show="userInfoForm.email.$error.required && userInfoForm.email.$touched">
                Please enter your email.
            </div>
            <div class="error-message" ng-show="userInfoForm.email.$error.email && userInfoForm.email.$touched">
                Please enter a valid email address.
            </div>

            <label for="phone">Phone:</label>
            <input type="tel" name="phone" id="phone" ng-model="userInfo.phone" required />
            <div class="error-message" ng-show="userInfoForm.phone.$error.required && userInfoForm.phone.$touched">
                Please enter your phone number.
            </div>

            <button type="submit" ng-disabled="userInfoForm.$invalid">Add User</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <?php
       while ($row = mysqli_fetch_array($result)) {
         ?>
                    <tr>
                        <td>
                            <?php echo $row[0]; ?>
                        </td>
                        <td>
                            <?php echo $row[1]; ?>
                        </td>
                        <td>
                            <?php echo $row[2]; ?>
                        </td>
                        <td>
                            <?php echo $row[3]; ?>
                        </td>
                    </tr>
                    <?php
       }
       ?>
            </tbody>
        </table>

        <div class="success-alert" ng-show="showSuccessAlert">User added successfully!</div>

        <div class="error-alert" ng-show="showErrorAlert">Please fill in all required fields correctly.</div>

        <script>
            var app = angular.module('myApp', []);
            app.controller('myController', function($scope) {
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
            });
        </script>
    </body>

    </html>