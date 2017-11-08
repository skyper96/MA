package com.example.filip.clops;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void btnLoginOnClick (View v){
        setContentView(R.layout.activity_home);

        listView = (ListView) findViewById(R.id.listView);
        List<String> shopList = new ArrayList<String>();
        shopList.add("Auchan\nAlexandru Vaida Voevod nr.53\nauchan@auchan.ro\n154m");
        shopList.add("Profi\nDecebal nr.21\ncluj@profi.ro\n70m");

        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(
                this,
                android.R.layout.simple_list_item_1,
                shopList );

        listView.setAdapter(arrayAdapter);
    }

    public void btnRequestAddOnClick (View v){
        EditText shopName = (EditText) findViewById(R.id.editTextShopName);
        EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
        EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
        EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

        Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                "mailto","filipmobile2017@gmail.com", null));
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Request to add a new shop");
        emailIntent.putExtra(Intent.EXTRA_TEXT, "Hi, I would like to add the shop: \"" + shopName.getText().toString()
                + "\" with the location at: \"" + shopAddress.getText().toString() + "\", the email: \""
                + shopEmail.getText().toString() + "\" and the net income: \"" + shopNetIncome.getText().toString() +
                "\"\n\nBest Regards"
        );
        startActivity(Intent.createChooser(emailIntent, "Send email..."));
    }
}
