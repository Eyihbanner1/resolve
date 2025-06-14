<?php
/**
 * Contact Form Handler for Resolve OTC
 * Sends form submissions to admin@resolve.ng
 */

// Set content type to JSON for AJAX responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Configuration
$to_email = 'admin@resolve.ng';
$from_email = 'noreply@resolve.ng'; // Should be from your domain
$subject_prefix = '[Resolve OTC Contact Form]';

// Sanitize and validate input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Get form data
    $name = sanitize_input($_POST['contactName'] ?? '');
    $email = sanitize_input($_POST['contactEmail'] ?? '');
    $company = sanitize_input($_POST['contactCompany'] ?? '');
    $inquiry_type = sanitize_input($_POST['contactInquiryType'] ?? '');
    $message = sanitize_input($_POST['contactMessage'] ?? '');
    
    // Validate required fields
    if (empty($name)) {
        throw new Exception('Name is required');
    }
    
    if (empty($email) || !validate_email($email)) {
        throw new Exception('A valid email address is required');
    }
    
    if (empty($message)) {
        throw new Exception('Message is required');
    }
    
    // Create email content
    $email_subject = $subject_prefix . ' ' . $inquiry_type . ' from ' . $name;
    
    $email_body = "
New contact form submission from Resolve OTC website:

Name: $name
Email: $email
Company: " . ($company ?: 'Not provided') . "
Inquiry Type: $inquiry_type

Message:
$message

---
Submitted from: " . $_SERVER['HTTP_HOST'] . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "
Timestamp: " . date('Y-m-d H:i:s T') . "
";
    
    // Email headers
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        // Success response
        echo json_encode([
            'success' => true,
            'message' => "Thank you, $name! Your message has been sent to our team at admin@resolve.ng. We'll get back to you shortly."
        ]);
    } else {
        throw new Exception('Failed to send email. Please try again later.');
    }
    
} catch (Exception $e) {
    // Error response
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
