# Test script to debug API response from PowerShell
$API_URL = 'http://localhost:1338'

Write-Host "Testing API at: $API_URL"

try {
    # Test basic endpoint
    $response = Invoke-RestMethod -Uri "$API_URL/api/recipies?populate=*" -Method Get
    Write-Host "Response received successfully"
    Write-Host "Response type: $($response.GetType().Name)"
    
    if ($response -and $response.data) {
        Write-Host "Data array length: $($response.data.Length)"
        if ($response.data.Length -gt 0) {
            Write-Host "First recipe:"
            $response.data[0] | ConvertTo-Json -Depth 3
        }
    } else {
        Write-Host "No data array found in response"
        Write-Host "Full response:"
        $response | ConvertTo-Json -Depth 3
    }
    
} catch {
    Write-Host "Error testing API: $($_.Exception.Message)"
    Write-Host "Status code: $($_.Exception.Response.StatusCode)"
} 